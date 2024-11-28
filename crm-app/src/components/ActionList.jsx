import Table  from "react-bootstrap/Table";

const ActionList = ({actions}) => {

    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Wydarzenie</th>
                    <th>Opis</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {actions.map((row, index) => {
                    return (
                        <tr key={row._id}>
                            <td>{index +1}</td>
                            <td>{row.type}</td>
                            <td>{row.description}</td>
                            <td>{row.date}</td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default ActionList;