import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import _ from 'lodash'
import Fab from '@mui/material/Fab'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoIcon from '@mui/icons-material/Info'
import EditIcon from '@mui/icons-material/Edit'


function Books() {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [books, setBooks] = useState([])

    useEffect(() => {
        getBooks()
    }, [])

    const router = useRouter()

    const getBooks = () => {
        //call api getbooks
        const result = [
            {
                book_id: 1,
                book_name: "Senhor do Aneis",
                is_rented: 1,
                created_at: "2022-04-04 19:00:00",
                updated_at: "2022-04-04 19:00:00",
                deleted_at: null
            }
        ]
        setBooks(result)
    }

    const getTableContent = () => {
        console.log("teste", books)
        return books.map(book => (
            <TableRow key={book.id}>
                <TableCell align="center">{book.book_id}</TableCell>
                <TableCell align="center">{book.book_name}</TableCell>
                <TableCell align="center">{book.is_rented ? 'Indisponivel' : 'Disponivel'}</TableCell>
                <TableCell align="center">
                    <Fab style={{ marginLeft: '5px' }} disabled={book.is_rented} color="primary" size="small" onClick={() => setOpen(true)}>
                        <InfoIcon />
                    </Fab>
                    <Fab style={{ marginLeft: '5px', backgroundColor: 'green' }} size="small" onClick={() => callFormPage(book)}>
                        <EditIcon style={{ color: 'white' }} />
                    </Fab>
                    <Fab style={{ marginLeft: '5px' }} color="secondary" size="small" onClick={() => callDeleteBook(book)}>
                        <DeleteIcon />
                    </Fab>
                </TableCell>
            </TableRow>
        ))
    }

    const callDeleteBook = book => {
        const book_id = _.get(book, 'book_id', '')

        //call api delete book passando o id do livro deletado
        const result = {
            success: true
        }
        if (result.success) {
            getBooks()
            setTitle('Atencao:')
            setMessage('Livro deletado com sucesso.')
            setOpen(true)

        }
    }

    const callFormPage = book => {
        router.push({
            pathname: '/formulario-livro',
            query: {
                book_id: _.get(book, 'book_id', ''),
                book_name: _.get(book, 'book_name', '')
            }
        })
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{ justifyContent: 'center', display: 'flex' }}>
                <h1 class="display-4">Livros</h1>
            </Grid>
            <Grid item xs={12} style={{ justifyContent: 'left', display: 'flex' }}>
                <Button variant='contained' color='primary' onClick={() => callFormPage()} style={{ marginLeft: '10px' }}>Criar novo</Button>
            </Grid>
            <Grid item xs={12} style={{ justifyContent: 'left', display: 'flex' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">Disponibilidade</TableCell>
                            <TableCell align="center">Acoes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.get(books, 'length', 0) > 0 ?
                            getTableContent() :
                            (<React.Fragment />)
                        }
                    </TableBody>
                </Table>
            </Grid>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    {message}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid >
    )
}

export default Books
