import React, { useMemo, useState } from 'react';
import { getOwners } from '../../services/documentsService';
import Loading from '../loading';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { findDocument } from '../../services/documentsService';
import { Table } from 'react-bootstrap';
import { API_BASE_URL } from '../../config/constants';
import Document from '../document';

const SearchForm = () => {
    const [loading, setLoading] = useState(true);
    const [owners, setOwners] = useState([]);
    const [ title, setTitle ] = useState('Búsqueda de usuarios:');
    const [ showResult, setShowResult ] = useState(false);
    const [ documents, setDocuments ] = useState(false);
    const [ currentDocument, setCurentDocument ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);

    const getOwnersList = async () => {
        const response = await getOwners();
        return response.data;
    };

    const searchDocument = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            name: e.target.name.value,
            owner: e.target.owner.value,
            date: e.target.date.value
        }
        findDocument(formData).then(response => {
            setLoading(false);
            setDocuments(response.data)
            setTitle('Resultado de búsqueda');
            setShowResult(true);
        });
    };

    const showDocument = id => {
        setCurentDocument(id)
        setShowModal(true)
    }

    useMemo(() => {
        getOwnersList().then(owners => {
            setLoading(false)
            setOwners(owners)
        })
    }, [])

    const onHide = () => {
        setShowModal(false);
    };

    return (
        <div>
            {(showModal && <Document onHide={onHide} documentId={currentDocument}/>)}
            <h3>{title}</h3>
        {(loading ? <Loading/> : !showResult ?
        <Form method='GET' onSubmit={searchDocument}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control name='name' type="input" placeholder="Ingresa el nombre del documento" />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Select name="owner" aria-label="Selecciona el propietario">
              <option value=''>Selecciona el propietario</option>
              {owners.map(owner => {
                  return <option value={owner._id}>{`${owner.name} ${owner.lastName}`}</option>
              })}
      </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control name="date" type="date" placeholder="Agrega una descripción" />
        </Form.Group>
        <Form.Group className="mb-3">
        <Button variant="primary" type="submit">
          Buscar
        </Button>
        </Form.Group>
      </Form>
      :
      <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha de subida</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
                {documents?.map(document => {
                    return(
                        <tr>
                        <td style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={() => showDocument(document._id)}>{document.name}</td>
                        <td>{document.createdAt}</td>
                        <td><a href={`${API_BASE_URL}/documents/${document._id}/download`}>Descargar |</a>
                        <a href={`/documents/${document._id}/asocciate-users`}>  Asociar usuarios </a>
                        </td>
                        </tr>
                    )
                })}
            </tbody>
          </Table>
      )}
        </div>
      );
}

export default SearchForm;
