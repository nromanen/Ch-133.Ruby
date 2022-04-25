import React, {useState, useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import CustomizedMenus from './changeButton.js'
import Cookies from 'universal-cookie';
import "../../../i18n"; 
import { baseUrlUsers }  from "../../../consts"; 
import Message from '../../../components/toster/toster'
const cookies = new Cookies();

const ChangeRole = () => {
  const language = cookies.get('i18next');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  let counter = 0;
  const token = cookies.get('user-info');

  const Url = {
    USER_URL: `${baseUrlUsers}`,
  }

  const config = {
    headers:{
      'Content-Type': 'application/json', 
      'X-lang': language
    }
  };

  const configWithToken = {
    headers:{
      'Content-Type': 'application/json', 
      'X-lang': language,
      'Authorization': `Bearer ${token}`,
    }
  };

  useEffect(() => {
    getUsers()
  }, []);

  const getUsers = async () => {
    await axios.get(Url.USER_URL, config).then(function (response) {
      setUsers(response.data)
    }) 
  };  

  const changeRole = async (id) => {
    let role = localStorage.getItem('changeRole');
    await axios.patch(`${Url.USER_URL}/${id}`, {"role_name": role}, configWithToken).then(function (response) {
      localStorage.removeItem('changeRole');
      setMessage(response.data["message"])
    }).catch(function (error) {
      setMessage(error.response.data['message'])
    });
    setShowMessage(true)
    getUsers();
  };

  return(
    <>
     <Message open={showMessage} text={message}/> 
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>change</TableCell>
              <TableCell>id</TableCell>
              <TableCell align="right">nick</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">role_id</TableCell>
              <TableCell align="right">created_at</TableCell>
              <TableCell align="right">user_info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { users ? 
              users.map((user) => (
                counter+=1,
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="right">
                    <CustomizedMenus 
                        change={() => changeRole(user.id)} 
                      />
                    </TableCell>
                  <TableCell component="th" scope="row">
                    {user.id}
                  </TableCell>
                  <TableCell align="right">{user.nick_name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.role_id}</TableCell>
                  <TableCell align="right">{user.created_at}</TableCell>
                  <TableCell align="right">
                    <a href={`/users/${user.id}/user_infos`}>info_link</a>
                  </TableCell>
                </TableRow>
              ))
            : null
          }
          </TableBody>
        </Table>
      </TableContainer>  
    </>
  );
}

export default ChangeRole