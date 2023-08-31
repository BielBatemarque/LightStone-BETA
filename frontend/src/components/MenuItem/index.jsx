import { Link } from 'react-router-dom';

export const MenuItem = ({ text, linkTo }) => {
    return(
        <Link to={linkTo}>{text}</Link>
    );
};