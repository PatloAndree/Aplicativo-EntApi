// import React, { useState } from 'react';
// import { List, ListItem, ListItemText, Collapse } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// // Interfaz para un lugar
// interface Lugar {
//   codigo: number;
//   nombre: string;
//   codigopadre?: number; // Puede ser opcional si no todos los lugares tienen un código de padre
//   hijos2?: { [key: string]: Lugar };
//   // Un objeto con nombres de lugares como claves y lugares como valores
// }

// // Función recursiva para renderizar la lista anidada
// function RenderNestedList({ lugar, level, open, onClick }: NestedListProps) {
//   const [isOpen, setIsOpen] = useState(open);

//   const handleClick = () => {
//     if (onClick) {
//       onClick(lugar);
//     }
//     setIsOpen(!isOpen); // Cambiamos el estado de isOpen al hacer clic
//   };

//   const iconStyles = {
//     cursor: 'pointer',
//   };

//   return (
//     <List>
//       <ListItem button onClick={handleClick}>
//         {level > 0 && (
//           <div style={iconStyles}>
//             {isOpen ? <RemoveIcon /> : <AddIcon />}
//           </div>
//         )}
//         <ListItemText primary={lugar.nombre} />
//       </ListItem>
//       <Collapse in={isOpen} timeout='auto' unmountOnExit>
//         <List component='div' disablePadding>
//           {Object.values(lugar.hijos2 || {}).map((child, index) => (
//             <RenderNestedList
//               key={index}
//               lugar={child}
//               level={level + 1}
//               open={false} // Establecemos open en falso para que no herede el estado de apertura
//               onClick={onClick}
//             />
//           ))}
//         </List>
//       </Collapse>
//     </List>
//   );
// }

// interface NestedListProps {
//   lugar: Lugar;
//   level: number;
//   open: boolean;
//   onClick?: (lugar: Lugar) => void;
// }

// function ListaAgrupada2() {
//   const [selectedLocation, setSelectedLocation] = useState<Lugar | null>(null);

//   const handleLocationClick = (lugar: Lugar) => {
//     setSelectedLocation(lugar);
//   };

//   // Tu JSON representado como un objeto
//   const data: { [key: string]: Lugar } = {
//     Nestle: {
//       codigo: 100,
//       nombre: 'Nestle',
//       hijos2: {
//         Lima: {
//           codigo: 1,
//           nombre: 'Lima',
//           hijos2: {
//             comas: {
//               codigo: 5,
//               nombre: 'Comas',
//               codigopadre: 1,
//             },
//             ancon: {
//               codigo: 8,
//               nombre: 'Ancon',
//               codigopadre: 1,
//             },
//           },
//         },
//         Trujillo: {
//           codigo: 2,
//           nombre: 'Trujillo',
//           hijos2: {
//             moche: {
//               codigo: 20,
//               nombre: 'Moche',
//               codigopadre: 2,
//             },
//             laredo: {
//               codigo: 50,
//               nombre: 'Laredo',
//               codigopadre: 2,
//             },
//           },
//         },
//         Arequipa: {
//             codigo: 3,
//             nombre: 'Arequipa',
//             hijos2: {
//               moche: {
//                 codigo: 30,
//                 nombre: 'Moche',
//                 codigopadre: 3,
//               },
//               laredo: {
//                 codigo: 70,
//                 nombre: 'Laredo',
//                 codigopadre: 3,
//               },
//             },
//           },
//       },
//     },
//   };

//   return (
//     <div className='col-12'>
//       <h2>Lugares</h2>
//       <RenderNestedList
//         lugar={data.Nestle}
//         level={0}
//         open={false} // Establecemos open en falso para que el elemento raíz siempre esté cerrado
//         onClick={handleLocationClick}
//       />
//     </div>
//   );
// }

// export default ListaAgrupada2;

import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/ExpandMore';
import RemoveIcon from '@mui/icons-material/KeyboardArrowUp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Folder from '@mui/icons-material/FolderOpen';

  // Estilos CSS personalizados
  const listItemStyles = {
    backgroundColor: '#ffff',
    borderRadius: 5,
    cursor: 'pointer',
    height: 35,
    display: 'flex',
    justifyContent: 'space-between', // Coloca el contenido a la derecha
  };

  const listItemTextStyles = {
    fontSize: '10px',
  };

  const expandedListItemStyles = {
    ...listItemStyles,
    maxWidth: '90%',
    border: '1px solid #929AAB',
  //   787A91 3A3535

  };
  const childrenListStyles = {
    paddingLeft: '20px', // Ajusta la cantidad de espacio a la izquierda para indentar los elementos hijos
  };

  // Interfaz para un lugar
  interface Lugar {
    codigo: number;
    nombre: string;
    codigopadre?: number;
    hijos2?: { [key: string]: Lugar };
    hijos3?: { [key: string]: Lugar };
  }

// Función recursiva para renderizar la lista anidada
  function RenderNestedList({ lugar, level, open, onClick }: NestedListProps) {
    const [isOpen, setIsOpen] = useState(open);

    const handleClick = () => {
      if (onClick) {
        onClick(lugar);
      }
      setIsOpen(!isOpen);
    };

    const hasChildren2 = Object.keys(lugar.hijos2 || {}).length > 0;
    const hasChildren3 = Object.keys(lugar.hijos3 || {}).length > 0;

    // const listItemStyle = isOpen ? expandedListItemStyles : listItemStyles;

    const listItemStyle = isOpen ? expandedListItemStyles : listItemStyles;

    const listItemTextContainerStyle = {
      display: 'flex',
      justifyContent: 'space-around',
      // backgroundColor: '#5463FF',
      alignItems: 'center', // Alinea verticalmente al centro
    };


    return (
      <List>
          <ListItem onClick={handleClick} style={listItemStyle}>
            <div style={listItemTextContainerStyle}>
              <Folder style={{color:'#FFC107',  fontSize:17}} />
              {/* <ListItemText primary={lugar.nombre} style={listItemTextStyles}  /> */}
              <Typography variant="body1" style={{ fontSize: '14.5px' }}>
                {lugar.nombre}
              </Typography>
            </div>
            {(hasChildren2 || hasChildren3) && (
              <div style={{ cursor: 'pointer' }}>
                {isOpen ? <RemoveIcon /> : <AddIcon />}
              </div>
            )}
          </ListItem>
          <Collapse in={isOpen} timeout='auto' unmountOnExit>
            {/* Aplica el estilo al contenedor de elementos hijos */}
            <List component='div' disablePadding style={childrenListStyles}>
              {Object.values(lugar.hijos2 || {}).map((child, index) => (
                <RenderNestedList
                  key={index}
                  lugar={child}
                  level={level + 1}
                  open={false}
                  onClick={onClick}
                />
              ))}
              {Object.values(lugar.hijos3 || {}).map((child, index) => (
                <RenderNestedList
                  key={index}
                  lugar={child}
                  level={level + 1}
                  open={false}
                  onClick={onClick}
                />
              ))}
            </List>
          </Collapse>
      </List>
    );
  }

  interface NestedListProps {
    lugar: Lugar;
    level: number;
    open: boolean;
    onClick?: (lugar: Lugar) => void;
  }

  function ListaAgrupada2() {
    const [selectedLocation, setSelectedLocation] = useState<Lugar | null>(null);

    const handleLocationClick = (lugar: Lugar) => {
      setSelectedLocation(lugar);
    };

    const data: { [key: string]: Lugar } = {
      Nestle: {
        codigo: 100,
        nombre: 'Nestle',
        hijos2: {
          Lima_norte: {
            codigo: 1,
            nombre: 'Lima Norte',
            hijos2: {
              comas: {
                codigo: 5,
                nombre: 'Comas',
                codigopadre: 1,
                hijos3: {
                  rosales: {
                    codigo: 120,
                    nombre: 'El retablo',
                    codigopadre: 8,
                  },
                },
              },
              ancon: {
                codigo: 8,
                nombre: 'Los olivos',
                codigopadre: 1,
                hijos3: {
                  rosales: {
                    codigo: 120,
                    nombre: 'Metro',
                    codigopadre: 8,
                  },
                },
              },
            },
            hijos3: {
              collique: {
                codigo: 89,
                nombre: 'Collique',
                codigopadre: 5,
              },
            },
          },
          Lima_sur: {
            codigo: 4,
            nombre: 'Lima sur',
            hijos2: {
              comas: {
                codigo: 5,
                nombre: 'Sjl',
                codigopadre: 1,
                hijos3: {
                  rosales: {
                    codigo: 120,
                    nombre: 'Etapa 1',
                    codigopadre: 8,
                  },
                },
              },
              ancon: {
                codigo: 8,
                nombre: 'Lurin',
                codigopadre: 1,
                hijos3: {
                  rosales: {
                    codigo: 120,
                    nombre: 'La tablada',
                    codigopadre: 8,
                  },
                },
              },
            },
            hijos3: {
              collique: {
                codigo: 89,
                nombre: 'Ate',
                codigopadre: 5,
              },
            },
          },
          Trujillo: {
            codigo: 2,
            nombre: 'Trujillo',
            hijos2: {
              moche: {
                codigo: 20,
                nombre: 'Moche',
                codigopadre: 2,
              },
              laredo: {
                codigo: 50,
                nombre: 'Laredo',
                codigopadre: 2,
              },
            },
          },
          Chiclayo: {
            codigo: 2,
            nombre: 'Chiclayo',
            hijos2: {
              moche: {
                codigo: 20,
                nombre: 'Eten',
                codigopadre: 2,
              },
              laredo: {
                codigo: 50,
                nombre: 'Pimentel',
                codigopadre: 2,
              },
            },
          },
          Huaral: {
            codigo: 8,
            nombre: 'Huaral',
            hijos2: {
              huaura: {
                codigo: 20,
                nombre: 'Huaura',
                codigopadre: 8,
              },
              huaral: {
                codigo: 50,
                nombre: 'Huaral',
                codigopadre: 8,
              },
            },
          },
          Ica: {
            codigo: 12,
            nombre: 'Ica',
            hijos2: {
              pisco: {
                codigo: 20,
                nombre: 'Pisco',
                codigopadre: 12,
              },
              piscociudad: {
                codigo: 50,
                nombre: 'Pisco - ciudad',
                codigopadre: 12,
              },
            },
          },
          Tacna: {
            codigo: 15,
            nombre: 'Tacna',
            hijos2: {
              pisco: {
                codigo: 20,
                nombre: 'Tacna',
                codigopadre: 15,
              },
              piscociudad: {
                codigo: 50,
                nombre: 'Tacna - ciudad',
                codigopadre: 15,
              },
            },
          },
        },
      },
    };

    return (
      <div className='col-12'>
        <h6>Locaciones</h6>
        <RenderNestedList
          lugar={data.Nestle}
          level={0}
          open={false}
          onClick={handleLocationClick}
        />
      </div>
    );
  }

  export default ListaAgrupada2;