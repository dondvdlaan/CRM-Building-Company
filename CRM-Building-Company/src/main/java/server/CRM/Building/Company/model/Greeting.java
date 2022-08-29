package server.CRM.Building.Company.model;

public class Greeting {

    // Attributes
    private final long id;
    private final String content;

    // Constructor
    public Greeting(long id, String content) {
        this.id = id;
        this.content = content;
    }
    // Getter and Setters
    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }
}
