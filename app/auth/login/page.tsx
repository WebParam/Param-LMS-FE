'use client';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie'; 
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import { Api } from '@/app/lib/restapi/endpoints';
import { IUserLoginModel } from '@/app/interfaces/user';
import { IActivityType } from '@/app/interfaces/analytics';

const cookies = new Cookies();
export default function Login() {
  const [disable, setDisable] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);

  }
  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  }
  const router = useRouter();
  const navigateToRegister = () => {
    router.push('/auth/student/register');
  }

  async function LoginUser(event: any) {
    cookies.remove('param-lms-user')
    setDisable(true)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let _id = toast.loading("Logging in..", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    if (!emailRegex.test(email)) {
      toast.update(_id, {
        render: "Invalid email address",
        type: "error",
        isLoading: false,
      });
      setTimeout(() => {
        setDisable(false)
        toast.dismiss(_id);
      }, 2000);


    } else {

      const payload = {
        Email: email,
        Password: password,
      } as IUserLoginModel;
      const user = await Api.POST_Login(payload);

      try {

        if (user?.data?.id) {
          toast.update(_id, {
            render: "Successfully logged in",
            type: "success",
            isLoading: false,
          });

          cookies.set('param-lms-user', JSON.stringify(user.data), { path: '/' });
          const targetId = uuidv4();
          if (typeof localStorage !== 'undefined') {
          
            localStorage.setItem("targetId", targetId);
            const date = new Date();
            const loginData = {
              sessionStart: new Date().toISOString(),
              sessionEnd: new Date(date.getTime() + 2 * 60000),
              lastActitive: new Date().toISOString()
            }

            localStorage.setItem("user-session", JSON.stringify(loginData))
          } else {

            console.log('localStorage is not available in this environment');
          }

          const activity = {
            UserId: user?.data?.id,
            from: new Date().toISOString(),
            to: new Date().toISOString(),
            ActivityType: IActivityType.Login,
            Duration: 0,
            TargetId: targetId
          }
          router.push('/protected/student/course/all-courses')

          const postActivity = await Api.POST_Activity(activity);
          if(postActivity.data?.id){
          
          }

        } else {
          toast.update(_id, {
            render: "Invalid login credentials",
            type: "error",
            isLoading: false,
          });
          setTimeout(() => {
            setDisable(false)
            toast.dismiss(_id);
          }, 3000);
        }
      }
      catch (error) {
        toast.update(_id, {
          render: "Invalid login credentials",
          type: "error",
          isLoading: false,
        });
        setTimeout(() => {
          setDisable(false)
          toast.dismiss(_id);
        }, 3000);
        console.log(error);
      }
      event?.preventDefault();
    }

  }


  return (
    <>
      <ToastContainer />
      <div className=" pt-32pt pt-sm-64pt pb-32pt">
        <div className="container page__container">
          <form className="col-md-5 p-0 mx-auto">
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email:
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={onChangeEmail}

                className="form-control"
                placeholder="Your email address ..."
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password:
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={onChangePassword}
                className="form-control"
                placeholder="Your password ..."
              />

            </div>
            <div className="text-center">
              <button disabled={disable} onClick={LoginUser} className="btn btn-accent">Login</button>
            </div>

          </form>
        </div>
      </div>
      <div className="page-separator justify-content-center m-0">
        <div className="page-separator__text">or sign-in with</div>
        <div className="page-separator__bg-top " />
      </div>
      <div className="bg-body pt-32pt pb-32pt pb-md-64pt text-center">
        <div className="page-separator__text mt-3">Do not have an account? <span style={{ cursor: "pointer", color: "blue" }} onClick={navigateToRegister}>sign-up</span></div>
      </div>
    </>


  )
}
