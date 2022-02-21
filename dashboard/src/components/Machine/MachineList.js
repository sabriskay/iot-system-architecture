import axios from "axios";
import React from "react";

const baseURL = `${process.env.HOST}/data-points`;

export default function MachineList () {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
        setData(response.data);
    });
  }, []);

  if (!data) return null;

  console.log(data)

  return (
    <div>
      <p>{data.body}</p>
    </div>
  );
}