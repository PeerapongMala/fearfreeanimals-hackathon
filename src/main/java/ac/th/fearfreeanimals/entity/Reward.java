package ac.th.fearfreeanimals.entity;

import jakarta.persistence.*;

@Entity
public class Reward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private Integer coinCost;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getCoinCost() {
        return coinCost;
    }

    public void setCoinCost(Integer coinCost) {
        this.coinCost = coinCost;
    }

    // Getters and Setters
}
