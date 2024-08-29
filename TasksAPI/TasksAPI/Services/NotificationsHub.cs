using Microsoft.AspNetCore.SignalR;

namespace TasksAPI.Services
{
    /// <summary>
    /// SignalR hub.
    /// </summary>
    public class NotificationsHub : Hub
    {

        /// <summary>
        /// Broadcast a message to every connected user, other than the one that sent it.
        /// </summary>
        public async Task BroadcastMessage(Object[] messages)
        {
            //For others
            await Clients.Others.SendAsync("message_received", messages);

            //For everyone
            //await Clients.All.SendAsync("message_received", messages);
        }

    }
}
