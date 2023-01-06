import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"

import { Link as RouterLink } from 'react-router-dom'


const AdministracaoPratos = () => {

  // constante com use state para assimilar qual tag é equivalente a qual tipo de dado, pratos para pegar os dados atuais e setPratos para alterações e use state para a cada alteração gerar no array novo
  const [pratos, setPratos] = useState<IPrato[]>([])

    //useEfect pois para a montagem de todos os pratos é feito apenas com os dados já "stored" e useEffect é usado para quando a requisição é feita uma vez sem precisar "monitora-la"
    useEffect(() => {
      //http foi o que criamos para deixar o código mais legivel, para que não tenhamos que colocar axios.get<Iprato[]>('http://localhost:8000/api/v2/pratos/'), afim de diminuir o código como se fosse um componente digamos
        http.get<IPrato[]>('pratos/')
            .then(resposta => setPratos(resposta.data))
    }, [])

    const excluir = (pratoAhSerExcluido: IPrato) => {
      //faz a requisição para deletar o prato de id X igual ao path
        http.delete(`pratos/${pratoAhSerExcluido.id}/`)
            .then(() => {
              //constante para listar todos os pratos e verificar um por um, se o id daquele prato é igual ao id que está sendo excluido, se for diferente, segue para setPratos onde refaz a lista dos pratos atualizada, SEM o que foi solicitado a ser excluido
                const listaPrato = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
                setPratos([...listaPrato])
            })
    }

  return (
    //Nome Descrição Tag Imagem(link) Editar(Link) Excluir(Botão)
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
{/*             <TableCell>
              Descrição
            </TableCell> */}
            <TableCell>
              Tag
            </TableCell>
            <TableCell>
              Imagem
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map(prato => <TableRow key={prato.id}>
            <TableCell>
              {prato.nome}
            </TableCell>
            {/* <TableCell>
              {prato.descricao}
            </TableCell> */}
            <TableCell>
              {prato.tag}
            </TableCell>
            <TableCell>
              [<a href={prato.imagem} target="_blank" rel="noreferreer">Ver Imagem</a>]
            </TableCell>
            <TableCell>
              [<RouterLink to={`/admin/pratos/${prato.id}`}>Editar</RouterLink>]
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
                Excluir
              </Button>
            </TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoPratos