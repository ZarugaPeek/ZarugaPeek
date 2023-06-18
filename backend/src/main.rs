use rusoto_core::Region;
use rusoto_sqs::{DeleteMessageRequest, ReceiveMessageRequest, Sqs, SqsClient};
use std::io::Error;

async fn worker_task() -> Result<(), Error> {
    let sqs_client = SqsClient::new(Region::default());

    loop {
        // Step 1: Pull a new message from AWS SQS

        // If no messages are available and the wait time expires, the call returns successfully with an empty list of messages.
        let receive_request = ReceiveMessageRequest {
            max_number_of_messages: Some(1),
            queue_url: "YOUR_QUEUE_URL".to_string(),
            visibility_timeout: Some(30), // The duration (in seconds) that the received messages are hidden from subsequent retrieve requests after being retrieved by this request.
            wait_time_seconds: Some(300), //The duration (in seconds) for which the call waits for a message to arrive in the queue before returning. If a message is available, the call returns sooner than WaitTimeSeconds.
            ..Default::default()
        };

        let Ok(response) = sqs_client.receive_message(receive_request).await else {
            panic!("request failed") // FIXME: do not panic, return Error
        };

        let messages = response.messages.unwrap();
        let message = messages.get(0).unwrap();

        // FIXME: Send API request and receive response
        println!("Received message from SQS: {:?}", message.body);

        // Delete the processed message from the queue
        if let Some(receipt_handle) = &message.receipt_handle {
            let delete_request = DeleteMessageRequest {
                queue_url: "YOUR_QUEUE_URL".to_string(),
                receipt_handle: receipt_handle.to_string(),
            };

            sqs_client.delete_message(delete_request).await.unwrap();
        }
    }
}

#[tokio::main]
async fn main() {
    tokio::spawn(worker_task());
}
