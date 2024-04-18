
const getInitials = (name) => {
    if (typeof name === 'string' && name?.trim()) {
        return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
    }
    return '';
};

const getColor = (name) => {
    const colors = [
        '#0388d2', '#455a65', '#004d40', '#ec417a', '#7d57c1', '#77919d', '#68a039',
        '#aa47bd', '#8c6e63', '#00579b', '#f6511e', '#5b6bc0', '#00897b', '#7b1fa4',
        '#5d4138', '#34691e', '#bd370b'
    ];

    let hash = 0;
    for (let i = 0; i < name?.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 4) - hash);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
};

const NameAvatar = ({ fullName }) => {
    const initials = getInitials(fullName);
    const backgroundColor = getColor(fullName);

    return (
        <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '20px',
            backgroundColor,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '20px',
            cursor: 'default'
        }}>
            {initials}
        </div>
    );
};

export default NameAvatar;