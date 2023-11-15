using Backend.Core.Requests;

namespace Backend.Services
{
    public interface IEmailService
    {
        void SendEmail(EmailRequest request);
    }
}