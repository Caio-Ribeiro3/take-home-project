interface iTable {
  fields: Array<Array<string | number>>;
}

const Table = (props: iTable) => {
  const { fields = [] } = props;

  return (
    <table>
      <tbody>
        {fields.map(([key, value]) => (
          <tr key={key}>
            <th>{key}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
