package core.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "elos")
public class Elo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String description;

    @Column(nullable = false)
    private int qtd_likes;

    @Column(nullable = false)
    private int qtd_comments;

    @Column(nullable = false, length = 255)
    private String category;

    @Column(nullable = false, length = 255)
    private String address;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    public Elo() {
    }

    public Elo(Long id, String description, int qtd_likes, int qtd_comments, String category, String address) {
        this.id = id;
        this.description = description;
        this.qtd_likes = qtd_likes;
        this.qtd_comments = qtd_comments;
        this.category = category;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQtd_likes() {
        return qtd_likes;
    }

    public void setQtd_likes(int qtd_likes) {
        this.qtd_likes = qtd_likes;
    }

    public int getQtd_comments() {
        return qtd_comments;
    }

    public void setQtd_comments(int qtd_comments) {
        this.qtd_comments = qtd_comments;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
