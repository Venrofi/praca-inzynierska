namespace Backend.Core.Requests
{
    public class EmailRequest
    {
        public string Receiver { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
    }
}
