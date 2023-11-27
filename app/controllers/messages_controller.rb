class MessagesController < ApplicationController
  def create
    # content
    @message = Message.new(message_params)
    # user
    @message.user = current_user

    # chatroom
    @chatroom = Chatroom.find(params[:chatroom_id])
    @message.chatroom = @chatroom

    @message.save
    ## broadcast l'info du message
    ChatroomChannel.broadcast_to(
      @chatroom,
      render_to_string(partial: "messages/message", locals: { message: @message })
    )
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
