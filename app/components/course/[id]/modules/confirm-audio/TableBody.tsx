import { NextPage } from "next";
import ReactAudioPlayer from "react-audio-player";
const TableBody: NextPage<{ list: any[] }> = ({ list }) => {

  return (
    <>
      <tbody className="list" id="staff">
        {list &&
          list.map((data: any, key) => (
            <tr key={key} className="selected">
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
                  style={{height: "35px"}}
                />
              </td>              
              <td className="text-center js-lists-values-projects small ">
                <input type="checkbox" />
              </td>
            </tr>
          ))}
      </tbody>
    </>
  );
};

export default TableBody;
