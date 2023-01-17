
import {useRouter} from 'next/router'
import {Rubik_Mono_One} from '@next/font/google'

const alfa = Rubik_Mono_One({subsets:['latin'],weight:['400']})


export default function Header(){
const router = useRouter();
return(
    <div className={"header " + alfa.className} >
    <div className={'indexTitle'} onClick={() => router.push('/')}>
        <h1 className={'italic'}> T </h1>
        <h1 className={'italic'}> H </h1>
        <h1 className={'italic'}> E </h1>
        <h1>  </h1>
        <h1> T </h1>
        <h1> I </h1>
        <h1> P </h1>
        <h1> O </h1>
        <h1> F </h1>
        <h1> F </h1>
        </div>
        </div>
  )
  }
