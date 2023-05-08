import React, { useEffect, useState } from 'react';
import { getDocuments } from '../../services/documentsService';
import Loading from '../loading';
import Table from 'react-bootstrap/Table';
import { API_BASE_URL } from '../../config/constants';
import Document from '../document';
import { useParams } from 'react-router-dom';

const Documents = () => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState([]);
    const [ currentDocument, setCurentDocument ] = useState();
    const [ showModal, setShowModal ] = useState(false);
    const params = useParams();

    const getDocumentList = async () => {
        const response = await getDocuments();
        return response.data;
    }

    useEffect(() => {
        if(params.documents) {
            return setDocuments(params.documents);
        }
        getDocumentList().then(documents => {
            setLoading(false);
            setDocuments(documents);
        })
    }, [showModal]);

    const onHide = () => {
        setShowModal(false);
    };

    const showDocument = id => {
        setCurentDocument(id)
        setShowModal(true)
    }

    return (
        <div>
            {(loading ? <Loading /> :
            <div>
            {(showModal && <Document onHide={onHide} documentId={currentDocument}/>)}
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Fecha de subida</th>
                <th>Propietario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
                {documents.map(document => {
                    return(
                        <tr>
                        <td style={{cursor: 'pointer', fontWeight: 'bold'}} onClick={() => showDocument(document._id)}>{document.name}</td>
                        <td>{document.createdAt}</td>
                        <td>{`${document.owner.name} ${document.owner.lastName}`}</td>
                        <td><a href={`${API_BASE_URL}/documents/${document._id}/download`}>Descargar | </a>
                            <a href={`/documents/${document._id}/asocciate-users`}>Asociar usuarios </a>
                        </td>
                        </tr>
                    )
                })}
            </tbody>
          </Table>
          </div>
)}
        </div>
    )
}

export default Documents;
