import app from '@/app'
import config from '@/config'

const { port, nodeEnv } = config

app.listen(port, () => {
  console.log(`Server is running on port ${port} in ${nodeEnv} mode`)
})

