
export default function Display({info}) {
    return (
        <div>
            <li className="list-group-item">{info.name} - {info.surname} - {info.email}</li>
        </div>
    )
}