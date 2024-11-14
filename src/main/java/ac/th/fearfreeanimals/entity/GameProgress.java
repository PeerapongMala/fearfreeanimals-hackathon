package ac.th.fearfreeanimals.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "game_progress")
public class GameProgress {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Username user;

    @Column(nullable = false)
    private int currentLevel;

    @Column(nullable = false)
    private boolean completed;

    @Column(name = "animal_type")
    private String animalType;  // Ensure this field exists and matches the query

    // Default constructor
    public GameProgress() {}

    // Constructor with user
    public GameProgress(Username user) {
        this.user = user;
        this.currentLevel = 1;  // Default starting level
        this.completed = false; // Default status
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Username getUser() {
        return user;
    }

    public void setUser(Username user) {
        this.user = user;
    }

    public int getCurrentLevel() {
        return currentLevel;
    }

    public void setCurrentLevel(int currentLevel) {
        this.currentLevel = currentLevel;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
    public String getAnimalType() {
        return animalType;  // Getter for animalType
    }

    public void setAnimalType(String animalType) {
        this.animalType = animalType;  // Setter for animalType
    }
}
