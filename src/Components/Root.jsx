
import { Outlet } from 'react-router-dom';
import Header from './Header';



const Root = () => {
    return (
        <div>
            <Header></Header>
           <div className='container mx-auto'>
                <Outlet></Outlet>
           </div>
        </div>
    );
};

export default Root;