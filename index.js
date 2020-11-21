const CloudWatch = require('aws-sdk/clients/cloudwatch')

const PING_INTERVAL = +process.env.PING_INTERVAL || 60000 // Default: 1 minute
const METRIC_NAMESPACE = process.env.METRIC_NAMESPACE || 'Heartbeat'
const METRIC_NAME = process.env.METRIC_NAME || 'DockerPing'

const client = new CloudWatch();
const params = {
  MetricData: [
    {
      MetricName: METRIC_NAME,
      Dimensions: [
        {
          Name: 'Service',
          Value: 'DockerPing'
        }
      ],
      StatisticValues: {
        Maximum: 1,
        Minimum: 1,
        SampleCount: 1,
        Sum: 1
      },
      Timestamp: Date.now(),
      Unit: 'Count',
      Value: 1,
    }
  ],
  Namespace: METRIC_NAMESPACE
}

const sendMetric = () => {
  params.MetricData.Timestamp = Date.now()
  client.putMetricData(params, function (err, _data) {
    if (err) {
      console.error(err, err.stack)
    } else if(process.env.DEBUG) {
      console.log('Ping Sent')
    }
  })
}

setInterval(sendMetric, PING_INTERVAL)
sendMetric() // Execute immediately
