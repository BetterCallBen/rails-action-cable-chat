import { Controller } from "@hotwired/stimulus";
import { createConsumer } from "@rails/actioncable";

// Connects to data-controller="chatroom"
export default class extends Controller {
  static values = {
    chatroomId: Number,
  };
  static targets = ["messages"];
  connect() {
    console.log(this.messagesTarget);
    this.channel = createConsumer().subscriptions.create(
      {
        channel: "ChatroomChannel",
        id: this.chatroomIdValue,
      },
      {
        received: (data) => {
          this.messagesTarget.insertAdjacentHTML("beforeend", data);
          this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight);
        },
      }
    );
    console.log(`je suis bien connecté à la chatroom ${this.chatroomIdValue}`);
  }

  reset(event) {
    event.currentTarget.reset();
  }

  disconnect() {
    console.log("Unsubscribed from the chatroom");
    this.channel.unsubscribe();
  }
}
