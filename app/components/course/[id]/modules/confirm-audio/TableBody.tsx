import { IParaPhraseResponseObject } from "@/app/interfaces/unit-standard";
import { confirmAudio } from "@/app/lib/actions/paraphrase";
import { NextPage } from "next";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { Modal } from "react-bootstrap";

const TableBody: NextPage<{ list: any[] }> = ({ list }) => {
  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: IParaPhraseResponseObject) => (
            <TableRow key={data.id} data={data} />
          ))}
      </tbody>
    </>
  );
};

export default TableBody;

const TableRow = ({ data }: { data: IParaPhraseResponseObject }) => {
  const {
    id: courseId,
    moduleId,
    documentId,
  } = useParams<{
    id: string;
    moduleId: string;
    documentId: string;
  }>();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const [isChecked, setIsChecked] = useState<boolean>(data.audioStatus == 1);
  const [confirmAudioModal, setConfirmAudioModal] = useState(false);

  const updateAudioStatus = async (id: string, value: boolean) => {
    setConfirmAudioModal(true)
    setIsChecked(value);
    await confirmAudio(id, value, courseId, moduleId, documentId, title);
    setConfirmAudioModal(false);
  };

  return (
    <>
    <Modal
      show={confirmAudioModal}
      size="sm"
      style={{height: '400px'}}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      keyboard={false}
      onHide={() => setConfirmAudioModal(false)}
      backdrop={false}
      
    >
      <Modal.Body>
      
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#252525', gap: '15px'}}>
        <div className="spinner-grow text-primary" role="status"/>
        <p>
          Confirming audio... 
        </p>
      </div>
      </Modal.Body>
    </Modal>

    <tr className="selected">
      <td
        style={{ width: "200px" }}
        className="text-center mx-auto text-justify js-lists-values-projects small"
      >
        <div className="d-flex align-items-center ml-5">
          <p className="text-justify">{data.title}</p>
        </div>
      </td>
      <td className="text-center js-lists-values-projects small">
        <ReactAudioPlayer
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          controls
          style={{ height: "35px" }}
        />
      </td>
      <td className="text-center js-lists-values-projects small ">
        <input
          type="checkbox"
          onClick={(event: any) => updateAudioStatus(data.id, event.target.checked)}
          checked={isChecked}
        />
      </td>
    </tr>
    </>
  );
};
