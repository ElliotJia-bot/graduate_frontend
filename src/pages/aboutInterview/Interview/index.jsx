import ExerciseTypeCheckbox from '@/features/ExerciseTypeCheckbox'
import moment from 'moment'
import ExerciseList from './component/ExerciseList'
import GenernateBtn from './component/GenernateBtn'
import StudentExercise from './component/StudentExercise'
import VideoFC from './component/VideoFC'
// 专家面试界面(面试相关，面试记录进去的部分) 这一部分学生专家端公用
const Interview = () => {
  const loginData = JSON.parse(localStorage.getItem('loginData'))
  const isStudent = loginData.role_id === ROLE_TYPE.STUDENT// 注册页面复用一下？
  const { id: _id } = useParams()
  const { interviewStore } = useStores()
  interviewStore.getInterviewRecord(_id)

  return (
    <div className="h-full flex flex-col">
      <div className="h-[50px] w-full flex items-center gap-[20px]">
        <div>房间号：{interviewStore.interview_room}</div>
        <div>
          时间：
          {moment(interviewStore.interview_start).format('YYYY-MM-DD HH:mm')}-
          {moment(interviewStore.interview_end).format('YYYY-MM-DD HH:mm')}
        </div>
        <div>专家账号：{interviewStore.interview_mas}</div>
        <div>学生账号：{interviewStore.interview_stu}</div>
      </div>
      <div className="flex gap-[10px] mt-[20px]">
        <VideoFC
          interview_room={interviewStore.interview_room}
          account={loginData.account}
          otherAccount={
            loginData.account === interviewStore.interview_mas
              ? interviewStore.interview_mas
              : interviewStore.interview_stu
          }
        />
          {/* {这里通过三目运算符判断使用专家端UI还是学生端UI} */}
        <div className="w-[21.5vw] h-[70vh]">
          <div
            className={`flex flex-col gap-[5px] ${isStudent ? 'hidden' : ''}`}
          >
            <ExerciseTypeCheckbox />
            <GenernateBtn />
            <ExerciseList />
          </div>
          <StudentExercise
            _id={_id}
            className={`${isStudent ? '' : 'hidden'}`}
          />
        </div>
      </div>
    </div>
  )
}

export default observer(Interview)
