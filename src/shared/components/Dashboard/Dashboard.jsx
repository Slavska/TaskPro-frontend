import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ColumnModal from "../Modal/ColumnModal/ColumnModal";
import { Modal } from "../Modal/Modal";
import * as css from "./Dashboard.styled";
import Columns from "../Columns/Columns";
import sprite from "../../images/icons.svg";
import { useSelector } from "react-redux";

import { getBackgroundByIcon } from "../../../hepers/getBackgroundByIcon";



const Dashboard = () => {
  const { dashboardId } = useParams();
  const [dashboard, setDashboards] = useState({});
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);

  const [backDashboad, setBackDashboad] = useState("")
  console.log("backDashboad:", backDashboad)

  const dashboards = useSelector((state) => state.dashboards.dashboards);


  useEffect(() => {
    async function someFunction() {
      setBackDashboad(await getBackgroundByIcon(dashboard.background))

    }

    someFunction();
  })


  useEffect(() => {
    dashboards.map((item) => {
      if (item._id === dashboardId) {
        setDashboards(item);
        setSelectedPriority(null);
      }
    });


  
  }, [dashboardId]);

  const toggleAddBoardModal = () => {
    setIsAddBoardOpen(!isAddBoardOpen);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleFilterMenuOpen = () => {
    if (isFilterMenuOpen) {
      setIsFilterMenuOpen(false);
      return;
    }
    setIsFilterMenuOpen(true);
  };

  const handleFilterMenuClose = () => {
    setIsFilterMenuOpen(false);
  };

  const filterCardsByPriority = (priority) => {
    setSelectedPriority(priority);
  };

  const hasCardsInColumns = () => {
    return dashboard.columns.some((column) => column.cards.length > 0);
  };

  const color = {
    "Without": "rgba(255, 255, 255, 0.30)",
    "Low": "#8FA1D0",
    "Medium": "#E09CB5",
    "High": "#BEDBB0"
  }



  return (
    <css.DivFull imgUrl={backDashboad}>
      {dashboardId ? (
        <>
          {dashboard.title && (
            <>
              <css.FilterDiv>
                <css.H1>{dashboard.title}</css.H1>
                {hasCardsInColumns() && (
                  <css.FilterBtn onClick={handleFilterMenuOpen}>
                    <css.Svg width="18" height="18">
                      <use href={sprite + "#icon-filter-priority"}></use>
                    </css.Svg>
                    <css.FilterTitleBtn>Filters</css.FilterTitleBtn>
                  </css.FilterBtn>
                )}
                {isFilterMenuOpen && (
                  <css.FilterMenu>
                    <css.StyledCloseButton onClick={handleFilterMenuClose}>
                      <css.Svg width="18" height="18">
                        <use href={sprite + "#icon-x-close"} />
                      </css.Svg>
                    </css.StyledCloseButton>
                    <css.FilterTitle>Filters</css.FilterTitle>
                    <css.FilterDivLabel>
                      <css.FilterLabel>Label color</css.FilterLabel>
                      <css.FilterLabelBtn onClick={() => filterCardsByPriority("all")}>
                        Show All
                      </css.FilterLabelBtn></css.FilterDivLabel>
                    <ul>
                      <css.FilterLi 
                        onClick={() => filterCardsByPriority("without")}
                      >
                        <css.SvgPriorityW  active={selectedPriority === 'without'}>
                          <use href={sprite + "#icon-Ellipse"}></use>
                        </css.SvgPriorityW>
                        Without
                      </css.FilterLi>
                      <css.FilterLi 
                        onClick={() => filterCardsByPriority("low")}
                      >
                        <css.SvgPriority color={color.Low} active={selectedPriority === 'low'}>
                        <use href={sprite + "#icon-Ellipse"}></use>
                      </css.SvgPriority>
                      Low
                    </css.FilterLi>
                      <css.FilterLi 
                      onClick={() => filterCardsByPriority("medium")}
                    >
                        <css.SvgPriority color={color.Medium} active={selectedPriority === 'medium'}>
                        <use href={sprite + "#icon-Ellipse"}></use>
                      </css.SvgPriority>
                      Medium
                    </css.FilterLi>
                      <css.FilterLi 
                      onClick={() => filterCardsByPriority("high")}
                    >
                        <css.SvgPriority color={color.High} active={selectedPriority === 'high'}>
                        <use href={sprite + "#icon-Ellipse"}></use>
                      </css.SvgPriority>
                      High
                    </css.FilterLi>
                  </ul>
                  </css.FilterMenu>
                )}
            </css.FilterDiv>

          <css.DivColumsBtn>

            <Columns
              dashboard={dashboard}
              selectedPriority={selectedPriority}
              dashboardId={dashboardId}
              columns={dashboard.columns}
            />

            <div>
              <css.ButtonAddColumn onClick={handleModalOpen}>
                <css.IconPlus />
                Add another column
              </css.ButtonAddColumn>
            </div>
          </css.DivColumsBtn>
        </>
      )}
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <ColumnModal onCloseModal={handleModalClose} />
        </Modal>
      )}
    </>
  ) : (
    <css.DivText>
      <p>
        Before starting your project, it is essential{" "}
        <span
          onClick={toggleAddBoardModal}
          style={{ cursor: "pointer", color: "#BEDBB0" }}
        >
          to create a board to{" "}
        </span>
        visualize and track all the necessary tasks and milestones. This
        board serves as a powerful tool to organize the workflow and ensure
        effective collaboration among team members.
      </p>
    </css.DivText>
  )
}

{
  isAddBoardOpen && (
    <Modal>
      <ColumnModal onClose={toggleAddBoardModal} />
    </Modal>
  )
}
    </css.DivFull >
  );
};

export default Dashboard;
