package org.wembleywonders.entity;

import javax.persistence.*;
import org.wembleywonders.enums.CreatorStage;
import org.wembleywonders.enums.GeographicTier;
import org.wembleywonders.enums.IncomeLevel;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Creator entity - represents a person in the Creator Factory pipeline
 * 
 * Journey: STEMgeneers (building) → TECHreneurs (earning)
 */
@Entity
@Table(name = "creators")
public class Creator {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String displayName;

    @Column(unique = true, nullable = false, precision = 0, scale = 0, updatable = false)
    private String email;

    // Stage & Programme
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, precision = 0, scale = 0, updatable = false, unique = false)
    private CreatorStage stage = CreatorStage.CURIOUS;

    @Column(nullable = false, precision = 0, scale = 0, updatable = false)
    private String programme = "STEMGENEERS";

    @Column(nullable = false, precision = 0, scale = 0, updatable = false)
    private LocalDateTime stageReachedDate;

    @Column(nullable = false, precision = 0, scale = 0, updatable = false)
    private LocalDate stemgeneersCompleted;

    @Column(nullable = false, precision = 0, scale = 0, updatable = false)
    private LocalDate techreneurStarted;

    // Geography
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, precision = 0, scale = 0, updatable = false)
    private GeographicTier geographicTier = GeographicTier.BRENT;

    @Column(nullable = false, precision = 0, scale = 0, updatable = false)
    private String postcode;

    // Income & Earnings
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, precision = 0, scale = 0, updatable = false)
    private IncomeLevel incomeLevel = IncomeLevel.PRE_REVENUE;

    @Column(precision = 10, scale = 2, nullable = false, updatable = false)
    private BigDecimal currentMonthlyIncome = BigDecimal.ZERO;

    @Column(precision = 10, scale = 2, nullable = false, updatable = false)
    private BigDecimal totalEarnings = BigDecimal.ZERO;

    @Column(nullable = false, updatable = false, precision = 0, scale = 0)
    private LocalDate firstSaleDate;

    // Mission Tracking
    @Column(nullable = false, updatable = false, precision = 0, scale = 0)
    private boolean firstTimeCreator = false;

    @Column(nullable = false, updatable = false, precision = 0, scale = 0)
    private boolean forgottenSixty = false;

    // Timestamps
    @Column(nullable = false, updatable = false, precision = 0, scale = 0)
    private LocalDate joinedDate;

    @Column(nullable = false, updatable = false, precision = 0, scale = 0)
    private LocalDateTime lastActiveDate;

    @Column(nullable = false, updatable = false, precision = 0, scale = 0)
    private LocalDateTime createdAt;

    @Column(nullable = false, updatable = false, precision = 0, scale = 0)
    private LocalDateTime updatedAt;

    // Constructors
    public Creator() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.joinedDate = LocalDate.now();
    }

    public Creator(String displayName, String email) {
        this();
        this.displayName = displayName;
        this.email = email;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters & Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public CreatorStage getStage() { return stage; }
    public void setStage(CreatorStage stage) { 
        this.stage = stage; 
        this.stageReachedDate = LocalDateTime.now();
        this.programme = stage.getProgramme();
    }

    public String getProgramme() { return programme; }
    public void setProgramme(String programme) { this.programme = programme; }

    public LocalDateTime getStageReachedDate() { return stageReachedDate; }
    public void setStageReachedDate(LocalDateTime stageReachedDate) { this.stageReachedDate = stageReachedDate; }

    public LocalDate getStemgeneersCompleted() { return stemgeneersCompleted; }
    public void setStemgeneersCompleted(LocalDate stemgeneersCompleted) { this.stemgeneersCompleted = stemgeneersCompleted; }

    public LocalDate getTechreneurStarted() { return techreneurStarted; }
    public void setTechreneurStarted(LocalDate techreneurStarted) { this.techreneurStarted = techreneurStarted; }

    public GeographicTier getGeographicTier() { return geographicTier; }
    public void setGeographicTier(GeographicTier geographicTier) { this.geographicTier = geographicTier; }

    public String getPostcode() { return postcode; }
    public void setPostcode(String postcode) { this.postcode = postcode; }

    public IncomeLevel getIncomeLevel() { return incomeLevel; }
    public void setIncomeLevel(IncomeLevel incomeLevel) { this.incomeLevel = incomeLevel; }

    public BigDecimal getCurrentMonthlyIncome() { return currentMonthlyIncome; }
    public void setCurrentMonthlyIncome(BigDecimal currentMonthlyIncome) { 
        this.currentMonthlyIncome = currentMonthlyIncome;
        this.incomeLevel = IncomeLevel.fromMonthlyIncome(currentMonthlyIncome);
    }

    public BigDecimal getTotalEarnings() { return totalEarnings; }
    public void setTotalEarnings(BigDecimal totalEarnings) { this.totalEarnings = totalEarnings; }

    public LocalDate getFirstSaleDate() { return firstSaleDate; }
    public void setFirstSaleDate(LocalDate firstSaleDate) { this.firstSaleDate = firstSaleDate; }

    public boolean isFirstTimeCreator() { return firstTimeCreator; }
    public void setFirstTimeCreator(boolean firstTimeCreator) { this.firstTimeCreator = firstTimeCreator; }

    public boolean isForgottenSixty() { return forgottenSixty; }
    public void setForgottenSixty(boolean forgottenSixty) { this.forgottenSixty = forgottenSixty; }

    public LocalDate getJoinedDate() { return joinedDate; }
    public void setJoinedDate(LocalDate joinedDate) { this.joinedDate = joinedDate; }

    public LocalDateTime getLastActiveDate() { return lastActiveDate; }
    public void setLastActiveDate(LocalDateTime lastActiveDate) { this.lastActiveDate = lastActiveDate; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
