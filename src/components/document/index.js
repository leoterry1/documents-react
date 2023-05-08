import { useMemo, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteDocument, getDocument } from '../../services/documentsService';
import Loading from '../loading';
import { API_BASE_URL } from '../../config/constants';

const Document = ({ documentId, onHide }) => {
    const [document, setDocument] = useState();
    const [loading, setLoading] = useState(true);

    const getCurrentDocument = async () => {
        const response = await getDocument(documentId)
        return response.data;
    };

    useMemo(() => {
        getCurrentDocument().then(document => {
            setLoading(false)
            setDocument(document)
        })
    }, [])

    const onDelete = async () => {
        await deleteDocument(documentId);
        onHide()
    }

    return (
        <div
            className="modal show"
            style={{ display: 'block', position: 'center' }}
        >
            <Modal show onHide={onHide}>
                {loading ? <Loading height={'20%'} width={'50%'}/> :
                (
                    <div>
                        <Modal.Header closeButton>
                    <Modal.Title>Datos del documento</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ul>
                        <li>Nombre: <a href={`${API_BASE_URL}/documents/${document._id}/download`}>{document.name}</a></li>
                        <li>Fecha de subida: {document.createdAt}</li>
                        <li>Propietario: {document.owner.name} {document.owner.lastName}</li>
                        <li>Usuarios: </li>
                        {document.users.map(user => {
                            return (
                                <ul>
                                <li>Nombre: {user?.name} </li>
                                <li>Apellido: {user?.lastName} </li>
                                <li>Nro. de documento: {user?.idNumber} </li>
                                </ul>
                            )
                        })}
                    </ul>
                </Modal.Body>

                <Modal.Footer>
                    <Button href={`/documents/${document._id}/edit`} variant="primary">Editar</Button>
                    <Button onClick={onDelete} variant="secondary">Eliminar</Button>
                </Modal.Footer>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Document;
