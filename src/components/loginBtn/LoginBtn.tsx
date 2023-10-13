
interface LoginBtnProps {
  redirectToAutoPath: () => void;
  name: string;
}


const LoginBtnComponent: React.FC<LoginBtnProps> = ({redirectToAutoPath, name}) => {

  return (
    <button
      className="loginBtn flex justify-between items-center w-full shadow-sm shadow-slate-400 rounded-lg h-[50px] transition-all duration-500 hover:bg-yellow-400 my-[20px]"
      onClick={redirectToAutoPath}
    >
      <img
        className="ml-[10px] w-[30px] h-[30px]"
        src={`/${name}.png`}
        alt={`${name} image`}
      />
      <span className="ml-[30px] flex-1 text-start">
        Continue with {name}
      </span>
    </button>
  )
}

export default LoginBtnComponent