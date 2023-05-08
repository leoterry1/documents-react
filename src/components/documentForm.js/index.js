import React, { useMemo, useState } from 'react';
import { postDocument, putDocument, getOwners } from '../../services/documentsService';
import Loading from '../loading';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';

const DocumentForm = () => {
    const [loading, setLoading] = useState(true);
    const [owners, setOwners] = useState([]);
    const params = useParams();

    const documentId = params.id;

    const getOwnersList = async () => {
        const response = await getOwners();
        return response.data;
    };

    const sendDocument = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('name', e.target.name.value);
        formData.append('attachment',  e.target.attachment.files[0]);
        formData.append('owner',  e.target.owner.value);
        formData.append('documentType', e.target.documentType.value);
        formData.append('description', e.target.description.value);
        let response = {};
        if (documentId) {
            response = await putDocument(documentId, formData);
        } else {
            response = await postDocument(formData);
        }
        if(!!response) setLoading(false);
    };

    useMemo(() => {
        getOwnersList().then(owners => {
            setLoading(false)
            setOwners(owners)
        })
    }, [])

    return (
        (loading ? <Loading/> :
        <Form method='POST' encType='multipart/form-data' onSubmit={sendDocument}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control name='name' type="input" placeholder="Ingresa el nombre del documento" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Archivo</Form.Label>
            <Form.Control name="attachment" type="file" placeholder="Selecciona el archivo" />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Select name="owner" aria-label="Selecciona el propietario">
                <option value=''>Selecciona el propietario</option>
                {owners.map(owner => {
                    return <option value={owner._id}>{`${owner.name} ${owner.lastName}`}</option>
                })}
        </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" >
        <Form.Select name="documentType" aria-label="Selecciona el tipo de documento">
                <option>Selecciona el tipo de documento</option>
                <option value='Público'>Público</option>
                <option value='Privado'>Privado</option>
                <option value='Draft'>Draft</option>
        </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control name="description" type="textarea" placeholder="Agrega una descripción" />
          </Form.Group>
          <Form.Group className="mb-3">
          <Button variant="primary" type="submit">
            Subir
          </Button>
          </Form.Group>

        </Form>
        )
      );
}

export default DocumentForm;
