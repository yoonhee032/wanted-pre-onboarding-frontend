import { MDBIcon, MDBBtn } from "mdb-react-ui-kit";

export default function Button({ func, data, icon, color }) {
  return (
    <>
      <MDBBtn
        type="submit"
        rounded
        color={color}
        className="ms-1"
        onClick={() => {
          func(data.id, data.todo)
            .then((res) => {
              console.log("dd")
              console.log("삭제", res);
              if (res.data.status) {
              }
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <MDBIcon fas icon={icon} size="xs"/>
      </MDBBtn>
    </>
  );
}
