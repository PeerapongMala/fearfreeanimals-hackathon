package ac.th.fearfreeanimals.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "game_progress")
public class GameProgress {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
<<<<<<< HEAD
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
=======
    @JoinColumn(name = "user_id")
    private Username user;
>>>>>>> 84e8640ae2fe19bcca8f00116fa9f8842f9f54b8

    @Column(nullable = false)
    private int currentLevel;

    @Column(nullable = false)
    private boolean completed;

    @Column(name = "animal_type")
    private String animalType;  // Ensure this field exists and matches the query

<<<<<<< HEAD
    public GameProgress() {}

    public GameProgress(User user, String animalType, Integer currentLevel, Boolean completed) {
        this.user = user;
        this.animalType = animalType;
        this.currentLevel = currentLevel;
        this.completed = completed;
    }

=======
    // Default constructor
    public GameProgress() {}

    // Constructor with user
    public GameProgress(Username user) {
        this.user = user;
        this.currentLevel = 1;  // Default starting level
        this.completed = false; // Default status
    }

    // Getters and Setters
>>>>>>> 84e8640ae2fe19bcca8f00116fa9f8842f9f54b8
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
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
