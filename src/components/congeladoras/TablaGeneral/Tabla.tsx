import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel,
  Box,createTheme, ThemeProvider
} from '@mui/material';
import { TableContainer } from '@mui/material';
import axios from 'axios';
import { API2 } from '../../../api/api2';
import './Tabla.css';
import refri from '../../../assets/congelador.png';

interface Data {
  codigo: number;
  nombre_locacion: string;
  sensor_id: string;
  bateria: string;
  movimiento: number;
  longitud: string;
  latitud: string;
  status: string;
  alarma:string;
  signal:string;
  fecha:string;
  [key: string]: string | number;
}

export default function Tabla() {
  const [tableData, setTableData] = useState<Data[]>([]);
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({
    // codigo: '',
    sensor_id: '',
    bateria: '',
    señal: '',
    ultima: '',
    nombre: '',
    latitud: '',
    longitud: '',
    movimiento: '',
    status: '',
    alarma: '',
  });

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); 
  const [sortColumn, setSortColumn] = useState<number | null>(null); 

  const API_URL = `${API2}/listaDispositivoMovimientoEstados/`;

  const postData = async () => {
    try {
      const apiUrl = API_URL;
      const requestBody = {
        empresa: '9',
        tipo: 'congeladora',
      };

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setTableData(response.data.data);
      console.log(tableData);
    } catch (error) {
      console.error('Error al enviar la solicitud POST:', error);
    }
  };

  useEffect(() => {
    postData();
  }, []);

  const filteredData = tableData.filter((row) => {
    return Object.keys(searchTerms).every((key) => {
      if (!searchTerms[key]) {
        return true;
      }
      const cellValue = String(row[key]).toLowerCase();
      const searchTerm = searchTerms[key].toLowerCase();
      return cellValue.includes(searchTerm);
    });
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>, columnName: string) => {
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [columnName]: event.target.value,
    }));
  };

  const handleColumnSortChange = (columnMeta: any) => {
    // Determina si la columna ya está ordenada y establece la dirección
    if (sortColumn === columnMeta.colIndex) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnMeta.colIndex);
      setSortOrder('asc');
    }
  };

  return (
    // <div className='flex-wrap'>

        <div className="responsive-table" style={{backgroundColor:'white'}} >
          {/* <p>hola</p> */}
          <TableContainer  >
              <Box display="flex" flexWrap="nowrap" justifyContent="space-between">
                  {Object.keys(searchTerms).map((columnName) => (
                  <TextField
                      key={columnName}
                      label={`Buscar ${columnName}`}
                      variant="outlined"
                      margin="dense"
                      size='small'
                      value={searchTerms[columnName]}
                      // sx={{ width: 130, borderRadius: 50 }}
                      // onChange={(event) => handleSearchChange(event, columnName)}
                      onChange={(event) => handleSearchChange(event as React.ChangeEvent<HTMLInputElement>, columnName)}
                  />
                  ))}
              </Box>
                  <Table>
                  <TableHead>
                      <TableRow>
                      {/* <TableCell>Código</TableCell> */}
                      <TableCell>Congeladora ID</TableCell>
                      <TableCell>Bateria</TableCell>
                      <TableCell>Señal</TableCell>
                      <TableCell>Ultima conexión</TableCell>
                      <TableCell>Locación</TableCell>
                      <TableCell>Latitud</TableCell>
                      <TableCell>Longitud</TableCell>
                      <TableCell>Movimiento</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Alarma</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {filteredData.map((row) => (
                      <TableRow key={row.codigo} className='rowHover'>
                          {/* <TableCell> */}
                              {/* <img
                                  src={refri}
                                  width="20" 
                                  height="20" 
                              /> */}
                              {/* {row.codigo}</TableCell> */}
                          <TableCell>{row.sensor_id}</TableCell>
                          <TableCell>{row.bateria} %</TableCell>
                          <TableCell>{row.signal}</TableCell>
                          <TableCell> {row.fecha}</TableCell>
                          <TableCell>{row.nombre_locacion}</TableCell>
                          <TableCell>{row.latitud}</TableCell>
                          <TableCell>{row.longitud}</TableCell>
                          <TableCell>{row.movimiento}</TableCell>
                          <TableCell>{row.status == "" ? "----" : row.status}</TableCell>
                          <TableCell>{row.alarma == "" ? "Movimiento" : row.status}</TableCell>

                      </TableRow>
                      ))}
                  </TableBody>
                  </Table>
          </TableContainer>

        </div>
  );
}


































// import React, { useState, useEffect } from 'react';
// import MUIDataTable from 'mui-datatables';
// import axios from 'axios';
// import { API2 } from '../../../api/api2';

// interface Data {
//   codigo: number;
//   nombre_locacion: string;
//   sensor_id: string;
//   bateria: string;
//   movimiento: number;
//   longitud: string;
//   latitud: string;
//   status: string;
//   [key: string]: string | number;
// }

// const columns = [
//   'Código',
//   'Nombre de Locación',
//   'Sensor ID',
//   'Batería',
//   'Movimiento',
//   'Longitud',
//   'Latitud',
//   'Status',
// ];

// export default function Tabla() {
//   const [tableData, setTableData] = useState<Data[]>([]);
//   const API_URL = `${API2}/listaDispositivoMovimiento/`;

//   const postData = async () => {
//     try {
//       const apiUrl = API_URL;
//       const requestBody = {
//         empresa: '9',
//         tipo: 'congeladora',
//       };

//       const response = await axios.post(apiUrl, requestBody, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       setTableData(response.data.data);
//     } catch (error) {
//       console.error('Error al enviar la solicitud POST:', error);
//     }
//   };

//   useEffect(() => {
//     postData();
//   }, []);

//   const transformedData = tableData.map((row) => [
//     row.codigo,
//     row.nombre_locacion,
//     row.sensor_id,
//     `${row.bateria} %`, // Formatea la columna de batería
//     row.movimiento,
//     row.longitud,
//     row.latitud,
//     row.status === '' ? '----' : row.status,
//   ]);

//   return (
//     <div className='bg-white rounded'>
//         <div className="card-body bg-white p-4">
//             <MUIDataTable
//                 title={'Lista de congeladoras'}
//                 data={transformedData}
//                 columns={columns}
//                 options={{
//                     filter: false,
//                     selectableRows: "none",
//                     responsive: "vertical",
//                     print:"false",
//                     search:"false",
//                     download:'false',
//                     viewColumns:'false',
//                   }}
//             />

//         </div>

//     </div>
//   );
// }




// import React, { useState, useEffect } from 'react';
// import MUIDataTable from 'mui-datatables';
// import axios from 'axios';
// import { API2 } from '../../../api/api2';
// import { TextField } from '@mui/material';

// interface Data {
//   codigo: number;
//   nombre_locacion: string;
//   sensor_id: string;
//   bateria: string;
//   movimiento: number;
//   longitud: string;
//   latitud: string;
//   status: string;
//   [key: string]: string | number;
// }

// const columns = [
//   'Código',
//   'Nombre de Locación',
//   'Sensor ID',
//   'Batería',
//   'Movimiento',
//   'Longitud',
//   'Latitud',
//   'Status',
// ];

// export default function Tabla() {
//   const [tableData, setTableData] = useState<Data[]>([]);
//   const [searchTerms, setSearchTerms] = useState<string[]>(columns.map(() => '')); // Inicializa los términos de búsqueda vacíos para cada columna
//   const API_URL = `${API2}/listaDispositivoMovimiento/`;

//   const postData = async () => {
//     try {
//       const apiUrl = API_URL;
//       const requestBody = {
//         empresa: '9',
//         tipo: 'congeladora',
//       };

//       const response = await axios.post(apiUrl, requestBody, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       setTableData(response.data.data);
//     } catch (error) {
//       console.error('Error al enviar la solicitud POST:', error);
//     }
//   };

//   useEffect(() => {
//     postData();
//   }, []);

//   // Función para filtrar los datos en función de los términos de búsqueda
//   const filteredData = tableData.filter((row) => {
//     return columns.every((_, columnIndex) => {
//       const searchTerm = searchTerms[columnIndex].toLowerCase();
//       const cellValue = String(row[columns[columnIndex]]).toLowerCase();
//       return cellValue.includes(searchTerm);
//     });
//   });

//   // Función para manejar cambios en los términos de búsqueda
//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>, columnIndex: number) => {
//     const newSearchTerms = [...searchTerms];
//     newSearchTerms[columnIndex] = event.target.value;
//     setSearchTerms(newSearchTerms);
//   };

//   return (
//     <div className='bg-white rounded'>
//       <div className="card-body bg-white p-4">
//         <MUIDataTable
//           title={'Lista de congeladoras'}
//           data={filteredData.map((row) => [
//             row.codigo,
//             row.nombre_locacion,
//             row.sensor_id,
//             `${row.bateria} %`,
//             row.movimiento,
//             row.longitud,
//             row.latitud,
//             row.status === '' ? '----' : row.status,
//           ])}
//           columns={columns.map((columnName, columnIndex) => ({
//             label: columnName,
//             name: columnName,
//             options: {
//               filter: true,
//               customFilterListOptions: {
//                 render: (v) => `Buscar ${v}`,
//               },
//               customFilterListRender: (v) => `Buscar ${v}`, // Devuelve una cadena en lugar de un elemento
//             },
//           }))}
//           options={{
//             filter: true, // Desactiva la opción global de filtro
//             selectableRows: 'none',
//             responsive: 'vertical',
//             print: false,
//             search: false,
//             download: false,
//             viewColumns: false,
//           }}
//         />
//       </div>
//     </div>
//   );
// }


