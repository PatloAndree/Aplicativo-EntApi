import React, { useCallback, useState } from "react";
import { useMailsAPI } from "../../../api-state/useMailsAPI";
import { addMailAPI, deleteMailAPI } from "../../../api/mails-api";
import { useAppStore } from "../../../store/store";
import CardWidget from "../../common/card-widget/CardWidget";
import Loading from "../../common/loading/Loading";
import ErrorMessage from "../../common/message/ErrorMessage";
import SuccessMessage from "../../common/message/SuccessMessage";
import MailConfig from "./MailConfig";

export default function MailConfigContainer() {
  const id = useAppStore((state) => state.user?.id);

  const {
    mailList,
    error: mailsError,
    isLoading: mailsLoading,
    mutate: mutateMails,
  } = useMailsAPI(`${id}`);

  const [addState, setAddState] = useState({
    loading: false,
    error: false,
    success: false,
  });
  const onAddMail = useCallback(
    (nombre: string, email: string) => {
      if (!id) return;
      setAddState({ loading: true, error: false, success: false });
      addMailAPI(nombre, email, `${id}`)
        .then(() => {
          setAddState((s) => ({ ...s, loading: false, success: true }));
          mutateMails();
        })
        .catch(() =>
          setAddState((s) => ({ ...s, loading: false, error: true }))
        );
    },
    [mutateMails, id]
  );

  const [delState, setDelState] = useState({
    loading: false,
    error: false,
    success: false,
  });
  // const onDeleteMail = useCallback(
  //   (id: string) => {
  //     setDelState({ loading: true, error: false, success: false });
  //     mutateMails((mails) => mails?.filter((m) => m.correo_id !== +id));
  //     deleteMailAPI(id)
  //       .then(() =>
  //         setDelState((s) => ({ ...s, loading: false, success: true }))
  //       )
  //       .catch(() =>
  //         setDelState((s) => ({ ...s, loading: false, error: true }))
  //       );
  //   },
  //   [mutateMails]
  // );

  // if (mailsLoading || !mailList) return <Loading className="my-5 py-2" />;
  // if (mailsError) return <ErrorMessage message="Error al cargar data." />;
  // return (
  //   <CardWidget title="Configuración de correos" toolbar={true}>
  //     <div className="p-4">
  //       <MailConfig
  //         mailList={mailList}
  //         onAddMail={onAddMail}
  //         addLoading={addState.loading}
  //         onDeleteMail={}
  //         deleteLoading={delState.loading}
  //       />
  //       <div className="mt-3">
  //         {delState.error && (
  //           <ErrorMessage message="No se pudo eliminar correo." />
  //         )}
  //         {delState.success && <SuccessMessage message="Correo eliminado." />}
  //         {addState.error && (
  //           <ErrorMessage message="No se pudo añadir correo." />
  //         )}
  //         {addState.success && <SuccessMessage message="Correo añadido." />}
  //       </div>
  //     </div>
  //   </CardWidget>
  // );
}
