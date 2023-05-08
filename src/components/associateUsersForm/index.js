import React, { useMemo, useState } from 'react';
import { associateUsers, getUsers } from '../../services/documentsService';
import Loading from '../loading';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';

const AssociateUsersForm = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const documentId = params.id;

    const getUsersList = async () => {
        const response = await getUsers();
        return response.data;
    };

    const sendDocument = async (e) => {
        e.preventDefault();
        const usersIds = users.map(user => {
            if(e.target[user._id].checked) return user._id
        }).filter(id => id);
        setLoading(true);
        associateUsers(documentId, usersIds).then(response => {
            setLoading(false);
            navigate(`/documents/${documentId}`);
        })

    };

    useMemo(() => {
        getUsersList().then(users => {
            setLoading(false)
            setUsers(users)
        })
    }, [])

    return (
        (loading ? <Loading/> :
        <Form method='PUT' onSubmit={sendDocument}>
          <Form.Group className="mb-3">
            <Form.Label>Seleccioná los usuarios a asociar:</Form.Label>
            {users.map(user => {
                return (<Form.Check type='checkbox' name={user._id} value={user._id} label={`${user.name} ${user.lastName}`}/>)
            })}
          </Form.Group>
          <Form.Group className="mb-3">
          <Button variant="primary" type="submit">
            Asociar
          </Button>
          </Form.Group>
        </Form>
        )
      );
}

export default AssociateUsersForm;
