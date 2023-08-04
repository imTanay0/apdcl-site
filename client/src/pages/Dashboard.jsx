import Options from "../components/Options"

const Dashboard = () => {
  return (
    <div>
      <Options
        label='Dashboard'
        circle={true}
        division={true}
        subDivision={true}
        link='dashboard'
      />
    </div>
  )
}

export default Dashboard