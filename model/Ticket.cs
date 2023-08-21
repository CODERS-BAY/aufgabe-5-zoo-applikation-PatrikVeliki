namespace ZooAPI.Model
{
    // Ticket-Modell
    public class Ticket
    {
        public int Id; // Ticket-ID
        public TicketType Type { get; set; } // Tickettyp (Kinder, Erwachsener, Senioren)
        public decimal Preis { get; set; } // Ticketpreis
        public DateTime Verkaufsdatum { get; set; } // Verkaufsdatum des Tickets
    }

    // Ticketpreise für verschiedene Typen
    public class TicketPrices
    {
        public decimal Kinder { get; } // Preis für Kinder
        public decimal Erwachsene { get; } // Preis für Erwachsene
        public decimal Senioren { get; } // Preis für Senioren

        public TicketPrices(decimal kinder, decimal erwachsene, decimal senioren)
        {
            Kinder = kinder;
            Erwachsene = erwachsene;
            Senioren = senioren;
        }
    }

    // Tickettypen
    public enum TicketType
    {
        Kinder, // Kinder-Ticket
        Erwachsener, // Erwachsenen-Ticket
        Senioren // Senioren-Ticket
    }
}