import "./UserCard.css";

function UserCard(props: any): JSX.Element {
    const { email, firstName, lastName, isOnline, username } = props.user;

    function handleClick() {
        props.getId(props.user._id)
    }

    return (
        <div className="UserCard" onClick={handleClick}>
            <p>{username}</p>
        </div>
    );
}

export default UserCard;
