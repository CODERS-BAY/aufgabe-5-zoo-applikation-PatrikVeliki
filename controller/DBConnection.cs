using MySqlConnector;

namespace ZooAPI.Controller
{
    // Datenbankverbindungsklasse
    public class DbConnection
    {
        private readonly IConfiguration _configuration; // Konfigurationsobjekt
        private readonly string? _connectionString; // Verbindungszeichenfolge zur Datenbank

        // Konstruktor mit Konfiguration
        public DbConnection(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString =
                _configuration.GetConnectionString("ZooDb"); // Verbindungszeichenfolge aus Konfiguration holen
        }

        // Überladener Konstruktor mit Verbindungszeichenfolge und Konfiguration
        public DbConnection(string? connectionString, IConfiguration configuration)
        {
            _connectionString = connectionString;
            _configuration = configuration;
        }

        // Asynchrone Methode zur Herstellung einer Datenbankverbindung
        public async Task<MySqlConnection> GetConnectionAsync()
        {
            var conn = new MySqlConnection(_connectionString); // Neue Verbindung erstellen
            await conn.OpenAsync(); // Verbindung asynchron öffnen
            return conn; // Verbindung zurückgeben
        }
    }
}