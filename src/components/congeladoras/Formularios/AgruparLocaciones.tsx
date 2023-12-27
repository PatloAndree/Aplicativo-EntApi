// import React, { useState } from 'react';
// import { List, ListItem, ListItemText, Collapse } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// interface NestedListProps {
//   items: string[];
//   level: number;
//   onClick?: () => void;
// }

// function RenderNestedList({ items, level, onClick }: NestedListProps) {
//   const [open, setOpen] = useState(false);

//   const handleClick = () => {
//     setOpen(!open);
//     if (onClick) {
//       onClick();
//     }
//   };

//   const iconStyles = {
//     cursor: 'pointer',
//   };

//   return (
//     <List>
//       <ListItem button onClick={handleClick}>
//         {level > 0 && (
//           <div style={iconStyles}>{open ? <RemoveIcon /> : <AddIcon />}</div>
//         )}
//         <ListItemText primary={items[0]} />
//       </ListItem>
//       <Collapse in={open} timeout='auto' unmountOnExit>
//         <List component='div' disablePadding>
//           {items.slice(1).map((item, index) => (
//             <ListItem key={index} button>
//               <ListItemText primary={item} />
//             </ListItem>
//           ))}
//         </List>
//       </Collapse>
//     </List>
//   );
// }

// function AgruparLocaciones() {
//   const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
//   const [selectedState, setSelectedState] = useState<string | null>(null);

//   const handleCountryClick = (country: string) => {
//     setSelectedCountry(country);
//     setSelectedState(null);
//   };

//   const handleStateClick = (state: string) => {
//     setSelectedState(state);
//   };

//   return (
//     <div className='col-12'>
//       <h2>Países, Estados y Distritos</h2>
//       <RenderNestedList
//         items={['País 1', 'Estado 1', 'Distrito 1', 'Distrito 2']}
//         level={0}
//         onClick={() => handleCountryClick('País 1')}
//       />
//       {selectedCountry === 'País 1' && (
//         <RenderNestedList
//           items={['Estado 1', 'Distrito 1', 'Distrito 2']}
//           level={1}
//           onClick={() => handleStateClick('Estado 1')}
//         />
//       )}
//       {selectedState === 'Estado 1' && (
//         <RenderNestedList items={['Distrito 1', 'Distrito 2']} level={2} />
//       )}
//     </div>
//   );
// }

// export default AgruparLocaciones




// import React, { useState } from 'react';
// import { List, ListItem, ListItemText, Collapse } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// interface Location {
//   name: string;
//   children?: Location[];
// }

// interface NestedListProps {
//   location: Location;
//   level: number;
//   open: boolean;
//   onClick?: () => void;
//   onToggle?: () => void;
// }

// function RenderNestedList({ location, level, open, onClick, onToggle }: NestedListProps) {
//   const handleClick = () => {
//     if (onClick) {
//       onClick();
//     }
//   };

//   const handleToggle = () => {
//     if (onToggle) {
//       onToggle();
//     }
//   };

//   const iconStyles = {
//     cursor: 'pointer',
//   };

//   return (
//     <List>
//       <ListItem button onClick={handleClick}>
//         {level > 0 && (
//           <div style={iconStyles} onClick={handleToggle}>
//             {open ? <RemoveIcon /> : <AddIcon />}
//           </div>
//         )}
//         <ListItemText primary={location.name} />
//       </ListItem>
//       <Collapse in={open} timeout='auto' unmountOnExit>
//         <List component='div' disablePadding>
//           {location.children?.map((child, index) => (
//             <RenderNestedList
//               key={index}
//               location={child}
//               level={level + 1}
//               open={open}
//               onClick={onClick}
//               onToggle={onToggle}
//             />
//           ))}
//         </List>
//       </Collapse>
//     </List>
//   );
// }

// function AgruparLocaciones() {
//   const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
//   const [openLocations, setOpenLocations] = useState<string[]>([]);

//   const handleLocationClick = (location: Location) => {
//     setSelectedLocation(location);
//     setOpenLocations((prevOpenLocations) =>
//       prevOpenLocations.includes(location.name)
//         ? prevOpenLocations.filter((loc) => loc !== location.name)
//         : [...prevOpenLocations, location.name]
//     );
//   };

//   const locationsData: Location[] = [
//     {
//       name: 'Perú',
//       children: [
//         {
//           name: 'Lima',
//           children: [
//             { name: 'Ancon' },
//             { name: 'Comas' },
//           ],
//         },
//         {
//           name: 'Trujillo',
//           children: [
//             { name: 'Moche' },
//             { name: 'Laredo' },
//           ],
//         },
//       ],
//     },
//   ];

//   return (
//     <div className='col-12'>
//       <h2>Países, Estados y Distritos</h2>
//       {locationsData.map((location, index) => (
//         <RenderNestedList
//           key={index}
//           location={location}
//           level={0}
//           open={openLocations.includes(location.name)}
//           onClick={() => handleLocationClick(location)}
//           onToggle={() => setOpenLocations([])}
//         />
//       ))}
//     </div>
//   );
// }

// export default AgruparLocaciones;


// ------------------------------------------------------------




// import React, { useState } from 'react';
// import { List, ListItem, ListItemText, Collapse } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// interface Location {
//   name: string;
//   children?: Location[];
// }

// interface NestedListProps {
//   location: Location;
//   level: number;
//   open: boolean;
//   onClick?: () => void;
//   onToggle?: () => void;
// }

// function RenderNestedList({ location, level, open, onClick, onToggle }: NestedListProps) {
//   const handleClick = () => {
//     if (onClick) {
//       onClick();
//     }
//   };

//   const handleToggle = () => {
//     if (onToggle) {
//       onToggle();
//     }
//   };

//   const iconStyles = {
//     cursor: 'pointer',
//   };

//   return (
//     <List>
//       <ListItem button onClick={handleClick}>
//         {level > 0 && (
//           <div style={iconStyles} onClick={handleToggle}>
//             {open ? <RemoveIcon /> : <AddIcon />}
//           </div>
//         )}
//         <ListItemText primary={location.name} />
//       </ListItem>
//       <Collapse in={open} timeout='auto' unmountOnExit>
//         <List component='div' disablePadding>
//           {location.children?.map((child, index) => (
//             <RenderNestedList
//               key={index}
//               location={child}
//               level={level + 1}
//               open={open}
//               onClick={onClick}
//               onToggle={onToggle}
//             />
//           ))}
//         </List>
//       </Collapse>
//     </List>
//   );
// }

// function AgruparLocaciones() {
//   const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
//   const [openLocations, setOpenLocations] = useState<string[]>([]);

//   const handleLocationClick = (location: Location) => {
//     setSelectedLocation(location);
//     setOpenLocations((prevOpenLocations) =>
//       prevOpenLocations.includes(location.name)
//         ? prevOpenLocations.filter((loc) => loc !== location.name)
//         : [...prevOpenLocations, location.name]
//     );
//   };

//   const locationsData: Location[] = [
//     {
//       name: 'Países',
//       children: [
//         {
//           name: 'Perú',
//           children: [
//             {
//               name: 'Lima',
//               children: [
//                 { name: 'Ancon' },
//                 { name: 'Comas' },
//               ],
//             },
//             {
//               name: 'Trujillo',
//               children: [
//                 { name: 'Moche' },
//                 { name: 'Laredo' },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ];

//   return (
//     <div className='col-12'>
//       <h2>Países, Estados y Distritos</h2>
//       {locationsData.map((location, index) => (
//         <RenderNestedList
//           key={index}
//           location={location}
//           level={0}
//           open={openLocations.includes(location.name)}
//           onClick={() => handleLocationClick(location)}
//           onToggle={() => setOpenLocations([])}
//         />
//       ))}
//     </div>
//   );
// }

// export default AgruparLocaciones;

// import React, { useState } from 'react';
// import { List, ListItem, ListItemText, Collapse } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

// interface NestedListProps {
//   items: string[];
//   level: number;
//   open: boolean;
//   onClick?: () => void;
//   onToggle?: () => void;
// }

// function RenderNestedList({ items, level, open, onClick, onToggle }: NestedListProps) {
//   const handleClick = () => {
//     if (onClick) {
//       onClick();
//     }
//   };

//   const handleToggle = () => {
//     if (onToggle) {
//       onToggle();
//     }
//   };

//   const iconStyles = {
//     cursor: 'pointer',
//   };

//   return (
//     <List>
//       <ListItem button onClick={handleClick}>
//         {level > 0 && (
//           <div style={iconStyles} onClick={handleToggle}>
//             {open ? <RemoveIcon /> : <AddIcon />}
//           </div>
//         )}
//         <ListItemText primary={items[0]} />
//       </ListItem>
//       <Collapse in={open} timeout='auto' unmountOnExit>
//         <List component='div' disablePadding>
//           {items.slice(1).map((item, index) => (
//             <ListItem key={index} button>
//               <ListItemText primary={item} />
//             </ListItem>
//           ))}
//         </List>
//       </Collapse>
//     </List>
//   );
// }

// function AgruparLocaciones() {
//   const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
//   const [selectedState, setSelectedState] = useState<string | null>(null);
//   const [openCountry, setOpenCountry] = useState(false);
//   const [openState, setOpenState] = useState(false);
//   const [openLima, setOpenLima] = useState(false); // Nuevo estado para Lima
//   const [openArequipa, setOpenArequipa] = useState(false);

//   const handleCountryClick = (country: string) => {
//     if (selectedCountry === country) {
//       // Si se hace clic en el país seleccionado, contraer todo
//       setSelectedCountry(null);
//       setOpenLima(false); // Cerrar Lima
//       setOpenArequipa(false); // Cerrar Arequipa
//     } else {
//       setSelectedCountry(country);
//       setOpenLima(false); // Cerrar Lima al cambiar de país
//       setOpenArequipa(false); // Cerrar Arequipa al cambiar de país
//     }
//   };

//   const handleStateClick = (state: string) => {
//     setSelectedState(state);
//     setOpenState(!openState); // Invertir el estado de apertura de estado
//   };

//   return (
//     <div className='col-12'>
//       <h2>Países, Estados y Distritos</h2>
//       <RenderNestedList
//         items={['Perú']}
//         level={0}
//         open={openCountry}
//         onClick={() => handleCountryClick('Perú')}
//         onToggle={() => setOpenState(false)} // Cerrar estado al expandir país
//       />

//       {selectedCountry === 'Perú' && (
//         <>
//           <RenderNestedList
//             items={['Lima', 'Ancon', 'Comas']}
//             level={1}
//             open={openLima}
//             onClick={() =>setOpenLima(!openLima)}
//           />
//           <RenderNestedList
//             items={['Arequipa', 'Cutervo', 'Oyon']} // Agregar distritos de Arequipa
//             level={2}
//             open={openArequipa}
//             onClick={() => setOpenArequipa(!openArequipa)}
//           />
//         </>
//       )}
//     </div>
//   );
// }

// export default AgruparLocaciones;




// -----------------------













import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Interfaz para un lugar
interface Lugar {
  codigo: number;
  nombre: string;
  codigopadre?: number; // Puede ser opcional si no todos los lugares tienen un código de padre
  hijos?: { [key: string]: Lugar }; 
  hijos2?: { [key: string]: Lugar }; // Un objeto con nombres de lugares como claves y lugares como valores
  // Un objeto con nombres de lugares como claves y lugares como valores
}

// Interfaz para el JSON completo
interface Data {
  [key: string]: Lugar; // Un objeto con nombres de lugares como claves y lugares como valores
}

// Función recursiva para renderizar la lista anidada
function RenderNestedList({ lugar, level, open, onClick, onToggle }: NestedListProps) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    }
  };

  const iconStyles = {
    cursor: 'pointer',
  };

  return (
    <List>
      <ListItem button onClick={handleClick}>
        {level > 0 && (
          <div style={iconStyles} onClick={handleToggle}>
            {open ? <RemoveIcon /> : <AddIcon />}
          </div>
        )}
        <ListItemText primary={lugar.nombre} />
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {Object.values(lugar.hijos || {}).map((child, index) => (
            <RenderNestedList
              key={index}
              lugar={child}
              level={level + 1}
              open={open}
              onClick={onClick}
              onToggle={onToggle}
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
  onClick?: () => void;
  onToggle?: () => void;
}

function AgruparLocaciones() {
  const [selectedLocation, setSelectedLocation] = useState<Lugar | null>(null);
  const [openLocations, setOpenLocations] = useState<string[]>([]);

  const handleLocationClick = (lugar: Lugar) => {
    setSelectedLocation(lugar);
    setOpenLocations((prevOpenLocations) =>
      prevOpenLocations.includes(String(lugar.codigo))
        ? prevOpenLocations.filter((loc) => loc !== String(lugar.codigo))
        : [...prevOpenLocations, String(lugar.codigo)]
    );
  };

  // Tu JSON representado como un objeto
  const data: Data = {
    Nestle: {
      codigo: 100,
      nombre: "Nestle",
      hijos: {
        Lima: {
          codigo: 1,
          nombre: 'Lima',
          hijos2: {
            comas: {
              codigo: 5,
              nombre: 'Comas',
              codigopadre: 1,
            },
            ancon: {
              codigo: 8,
              nombre: 'Ancon',
              codigopadre: 1,
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
      },
    },
  };

  return (
    <div className='col-12'>
      <h2>Lugares</h2>
      <RenderNestedList
        lugar={data.Nestle}
        level={0}
        open={openLocations.includes(String(data.Nestle.codigo))}
        onClick={() => handleLocationClick(data.Nestle)}
        onToggle={() => setOpenLocations([])}
      />
    </div>
  );
}

export default AgruparLocaciones;
