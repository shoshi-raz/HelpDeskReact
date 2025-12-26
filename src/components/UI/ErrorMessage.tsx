

// const ErrorMessage=(message:string)=>{
//     return 
//         <div style={{color: 'red'}}>{message}</div>
// }
// export default ErrorMessage;


interface ErrorMessageProps {
    message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
        <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>
            {message}
        </div>
    );
};

export default ErrorMessage;