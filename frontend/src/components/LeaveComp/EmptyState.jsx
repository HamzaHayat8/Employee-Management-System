function EmptyState({ colSpan }) {
  return (
    <tr>
      <td colSpan={colSpan} className="text-center py-10 text-slate-400">
        No applications found
      </td>
    </tr>
  );
}

export default EmptyState;
