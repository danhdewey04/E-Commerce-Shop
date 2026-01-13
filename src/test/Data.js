import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
const Data = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const age = searchParams.get("age");

  //   const params = useParams();
  //   const id = params.id
  const { id } = useParams();
  return (
    <>
      <h1>Page Data {id}</h1>
    </>
  );
};

export default Data;
