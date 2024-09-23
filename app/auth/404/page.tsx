import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="p-4 d-flex justify-content-center align-items-center vh-100 w-100">
            <div className='card w-50 h-50 d-flex flex-column justify-content-center align-items-center'>
                <h1 className='text-center text-danger' style={{fontSize:'120px'}}>404</h1>
                <p className='text-center text-dark'>Oops! Page not found.</p>
                <Link href="/" className='text-primary'><u>Go back home</u></Link>
            </div>
        </div>
    )
}