package ac.th.fearfreeanimals.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "game_progress")
public class GameProgress {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne

    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Column(nullable = false)
    private int currentLevel;

    @Column(nullable = false)
    private boolean completed;

    @Column(name = "animal_type")
    private String animalType;  // Ensure this field exists and matches the query

    public GameProgress() {}

    public GameProgress(User user, String animalType, Integer currentLevel, Boolean completed) {
        this.user = user;
        this.animalType = animalType;
        this.currentLevel = currentLevel;
        this.completed = completed;
    }


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
