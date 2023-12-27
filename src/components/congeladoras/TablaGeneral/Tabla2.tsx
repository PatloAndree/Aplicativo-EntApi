import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

function Tabla2() {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Columna 1</TableCell>
            <TableCell>Columna 2</TableCell>
            <TableCell>Columna 3</TableCell>
            {/* ... Agrega más columnas según tu necesidad */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Aquí agregas las filas de datos */}
          <TableRow>
            <TableCell>Dato 1</TableCell>
            <TableCell>Dato 2</TableCell>
            <TableCell>Dato 3</TableCell>
            {/* ... Agrega más celdas según tu necesidad */}
          </TableRow>
          {/* ... Agrega más filas según tu necesidad */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Tabla2;
