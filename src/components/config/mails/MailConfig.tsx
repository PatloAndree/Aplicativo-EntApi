import { FormEvent, useState } from "react";
import { MailAPIType } from "../../../api/mails-api";
import ResponsiveContainer from "../../common/ResponsiveContainer";

interface Props {
  mailList: MailAPIType[];
  onAddMail: (name: string, email: string) => any;
  addLoading: boolean;
  onDeleteMail: (id: string) => any;
  deleteLoading: boolean;
}
export default function MailConfig(props: Props) {
  const [correoName, setCorreoName] = useState("");
  const [correoEmail, setCorreoEmail] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Validation
    if (correoEmail.length > 100 || correoName.length > 50) return;
    props.onAddMail(correoName, correoEmail);
  };

  if (props.mailList.length === 0) return null;
  return (
    <div className=" d-flex justify-content-around gap-5 flex-wrap">
      <form onSubmit={onSubmit}>
        <div className="text-secondary">
          Correo al que le llegará automáticamente el reporte diario.
        </div>
        <div className="mt-3">
          <input
            className="form-control bg-light bg-opacity-25"
            type="text"
            placeholder="Ingrese un nombre"
            value={correoName}
            onChange={(e) => setCorreoName(e.target.value)}
            required
          />
        </div>
        <div className="mt-3">
          <input
            className="form-control bg-light bg-opacity-25"
            type="email"
            placeholder="Ingrese un correo válido"
            value={correoEmail}
            onChange={(e) => setCorreoEmail(e.target.value)}
            required
          />
        </div>
        <button
          className="my-3 btn btn-primary"
          type="submit"
          disabled={props.addLoading}
        >
          Añadir
        </button>
      </form>

      <div>
        <ResponsiveContainer>
          <div className="pe-3">
            <table className="table" style={{ fontSize: "small" }}>
              <thead>
                <tr>
                  <th className="px-4">Nombre</th>
                  <th className="px-4">Correo</th>
                  <th className="px-4">Acción</th>
                </tr>
              </thead>
              <tbody className="text-dark text-opacity-75">
                {props.mailList.map((mail) => (
                  <tr key={mail.correo_id}>
                    <td className="px-4">{mail.correo_nombre}</td>
                    <td className="px-4">{mail.correo_email}</td>
                    <td className="px-4">
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => props.onDeleteMail(`${mail.correo_id}`)}
                        disabled={props.deleteLoading}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
