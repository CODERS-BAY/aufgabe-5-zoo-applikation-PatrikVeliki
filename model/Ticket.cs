namespace ZooAPI.Model
{
    // Ticket-Modell
    public class Ticket
    {
        public int Id { get; set; } // Ticket-ID
        public TicketType Type { get; set; } // Tickettyp (Kinder, Erwachsener, Senioren)
        public decimal Preis { get; set; } // Ticketpreis
        public DateTime Verkaufsdatum { get; set; } // Verkaufsdatum des Tickets
    }

    // Ticketpreise für verschiedene Typen
    public class TicketPrices
    {
        public decimal Kinder { get; set; } // Preis für Kinder
        public decimal Erwachsene { get; set; } // Preis für Erwachsene
        public decimal Senioren { get; set; } // Preis für Senioren
    }

    // Tickettypen
    public enum TicketType
    {
        Kinder, // Kinder-Ticket
        Erwachsener, // Erwachsenen-Ticket
        Senioren // Senioren-Ticket
    }
}